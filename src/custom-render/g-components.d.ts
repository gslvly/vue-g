// global.d.ts
import type {
  Circle,
  CircleStyleProps,
  DisplayObjectConfig,
  Group,
  HTML,
  Image,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  Text,
  Ellipse,
} from "@antv/g";
import type { DefineComponent } from "vue";

declare module "vue" {
  export interface GlobalComponents {
    GCircle: DefineComponent<ConstructorParameters<typeof Circle>[0]>;
    GGroup: DefineComponent<ConstructorParameters<typeof Group>[0]>;
    GRect: DefineComponent<ConstructorParameters<typeof Rect>[0]>;
    GLine: DefineComponent<ConstructorParameters<typeof Line>[0]>;
    GPath: DefineComponent<ConstructorParameters<typeof Path>[0]>;
    GImage: DefineComponent<ConstructorParameters<typeof Image>[0]>;
    GPolyline: DefineComponent<ConstructorParameters<typeof Polyline>[0]>;
    GPolygon: DefineComponent<ConstructorParameters<typeof Polygon>[0]>;
    GText: DefineComponent<ConstructorParameters<typeof Text>[0]>;
    GPolygon: DefineComponent<ConstructorParameters<typeof Polygon>[0]>;
    GHtml: DefineComponent<ConstructorParameters<typeof HTML>[0]>;
    GEllipse: DefineComponent<ConstructorParameters<typeof Ellipse>[0]>;
  }
}
