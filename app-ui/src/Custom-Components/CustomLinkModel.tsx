import { DefaultLinkModel } from "@projectstorm/react-diagrams";

export class CustomLinkModel extends DefaultLinkModel {
  constructor() {
    super({
      type: "advanced",
      width: 2,
    });
  }
}
