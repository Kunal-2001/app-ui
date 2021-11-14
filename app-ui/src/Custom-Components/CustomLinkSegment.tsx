import { CustomLinkModel } from "./CustomLinkModel";
import React from "react";

export class CustomLinkSegment extends React.Component<{
  model: CustomLinkModel;
  path: string;
}> {
  path: SVGPathElement;
  circle: SVGCircleElement;
  callback: () => any;
  percent: number;
  handle: any;
  mounted: boolean;

  constructor(props) {
    super(props);
    this.percent = 0;
  }

  componentDidMount() {
    this.mounted = true;
    this.callback = () => {
      if (!this.circle || !this.path) {
        return;
      }

      if (this.percent < 90) {
        this.percent += 2;
      }

      let point = this.path.getPointAtLength(
        this.path.getTotalLength() * (this.percent / 100.0)
      );

      this.circle.setAttribute("cx", "" + point.x);
      this.circle.setAttribute("cy", "" + point.y);

      if (this.percent >= 90) {
        return;
      }

      if (this.mounted) {
        requestAnimationFrame(this.callback);
      }
    };
    requestAnimationFrame(this.callback);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    let { path, model } = this.props;
    return (
      <>
        <svg width="100cm" height="100cm" xmlns="http://www.w3.org/2000/svg">
          {/* <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="1"
              markerHeight="1"
              orient="auto-start-reverse"
            >
              <path
                ref={(ref) => {
                  this.circle = ref;
                }}
                d="M 0 0 L 10 5 L 0 10 z"
              />
            </marker>
          </defs> */}

          <path
            ref={(ref) => {
              this.path = ref;
            }}
            strokeWidth={model.getOptions().width}
            fill="none"
            stroke="black"
            d={path}
          />
          <circle
            ref={(ref) => {
              this.circle = ref;
            }}
            r={10}
            fill="orange"
          />
        </svg>
      </>
    );
  }
}
