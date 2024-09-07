import type { Heading as MDASTHeading } from "mdast";

export interface Heading {
  depth: MDASTHeading["depth"];
  value: string;
  id: string;
}
