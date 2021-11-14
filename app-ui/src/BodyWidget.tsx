import * as React from "react";
import { DiagramEngine } from "@projectstorm/react-diagrams";
import { CanvasWidget } from "@projectstorm/react-canvas-core";

export interface BodyWidgetProps {
  engine: DiagramEngine;
}

export class BodyWidget extends React.Component<BodyWidgetProps> {
  render() {
    return <CanvasWidget className="canvas" engine={this.props.engine} />;
  }
}
