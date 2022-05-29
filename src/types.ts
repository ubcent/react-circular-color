import { ReactElement } from 'react';

export type CircularColorProps = {
  size: number;
  numberOfSectors: number;
  className: string;
  onChange: (v: string) => void;
  centerRect: boolean;
  renderRect: Function;
  renderHandle: Function;
  color: string;
  children: ReactElement[];
};

export interface RenderReact {
  color: string;
  x: number;
  y: number;
}

export interface RenderHandle {
  onHandleDown: () => void;
  handleRadius: number;
  cx: number;
  cy: number;
}
