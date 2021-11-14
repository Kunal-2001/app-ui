import createEngine, {
  DefaultNodeModel,
  DiagramModel,
} from "@projectstorm/react-diagrams";
import { BodyWidget } from "./BodyWidget";
import { CustomLinkModel } from "./Custom-Components/CustomLinkModel";
import { CustomLinkFactory } from "./Custom-Components/CustomLinkFactory";
import "./BasicConnection.css";
import { useEffect } from "react";
import axios from "axios";

export default function BasicConnection() {
  const engine = createEngine();

  const fillComponents = async (models) => {
    let nodesData = [];
    let linksData = [];

    models.forEach((item) => {
      if (item["position"] !== undefined) {
        nodesData.push({ id: item.options.id, name: item.options.name });
      } else {
        linksData.push({
          src: item.sourcePort.parent.options.id,
          dest: item.targetPort.parent.options.id,
        });
      }
    });
    await axios({
      method: "POST",
      data: {
        components: nodesData,
        links: linksData,
      },
      url: "http://localhost:5000/api/state/cache",
    }).then((response) => {
      console.log(response);
    });
  };

  useEffect(() => {
    fillComponents(models);
  }, []);

  engine.getLinkFactories().registerFactory(new CustomLinkFactory());

  const node1 = new DefaultNodeModel({
    name: "Source",
    color: "rgb(0,192,255)",
  });

  node1.setPosition(100, 100);
  let port1 = node1.addOutPort("Out");

  const node2 = new DefaultNodeModel({
    name: "Destination",
    color: "rgb(0,100,255)",
  });
  node2.setPosition(100, 200);
  let port2 = node2.addInPort("In");

  const link = new CustomLinkModel();
  link.setSourcePort(port1);
  link.setTargetPort(port2);

  let model = new DiagramModel();

  let models = model.addAll(link, node1, node2);

  models.forEach((item) => {
    item.registerListener({
      eventDidFire: function (e) {
        let nodePortName = e["entity"].options.name;
        console.log(`${nodePortName} is dragged`);
      },
    });
  });

  engine.setModel(model);

  return (
    <div>
      <BodyWidget engine={engine} />
    </div>
  );
}
