import { DefaultLinkFactory } from "@projectstorm/react-diagrams";
import { CustomLinkModel } from "./CustomLinkModel";
import { CustomLinkSegment } from "./CustomLinkSegment";

export class CustomLinkFactory extends DefaultLinkFactory {
  constructor() {
    super("advanced");
  }

  generateModel(): CustomLinkModel {
    return new CustomLinkModel();
  }

  /**
   * @override the DefaultLinkWidget makes use of this, and it normally renders that
   * familiar gray line, so in this case we simply make it return a new advanced segment.
   */
  generateLinkSegment(model: CustomLinkModel, selected: boolean, path: string) {
    return (
      <g>
        <CustomLinkSegment model={model} path={path} />
      </g>
    );
  }
}
