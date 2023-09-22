export interface FrameData {
  delta: number;
  timestamp: number;
}

export interface Frame {
  (data: FrameData): void;
}

class FrameManager {
  private frameId: number | null;
  private keepAliveFrameId: number | null;
  private lastTimestamp: number | null;
  private frames: Frame[];
  private keepAliveFrames: Frame[];
  private defaultTimestep: number;

  constructor() {
    this.frameId = null;
    this.keepAliveFrameId = null;
    this.lastTimestamp = null;
    this.frames = [];
    this.keepAliveFrames = [];
    this.defaultTimestep = (1 / 60) * 1000;
  }

  private handleFrameLoop = (timestamp: number) => {
    if (this.lastTimestamp) {
      const delta = timestamp - this.lastTimestamp;
      this.keepAliveFrames.forEach(frame => frame.call(this, { delta, timestamp }));
    }
    this.lastTimestamp = timestamp;
    if (this.keepAliveFrameId) {
      cancelAnimationFrame(this.keepAliveFrameId);
    }
    this.keepAliveFrameId = requestAnimationFrame(this.handleFrameLoop);
  };

  private handleFrame = (timestamp: number) => {
    this.frames.forEach(frame => frame.call(this, { delta: this.defaultTimestep, timestamp }));
  };

  public getFrames = () => {
    return this.frames;
  };

  public add = (frame: Frame, keepAlive = false) => {
    this.cancelFrame();
    if (!this.frames.includes(frame)) {
      this.frames.push(frame);
    }
    if (keepAlive && !this.keepAliveFrames.includes(frame)) {
      this.keepAliveFrames.push(frame);
    }
    this.start();

    return this;
  };

  private start = () => {
    this.frameId = requestAnimationFrame(this.handleFrame);
    this.keepAliveFrameId = requestAnimationFrame(this.handleFrameLoop);
  };

  private cancelFrame = () => {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
    if (this.keepAliveFrameId != null) {
      cancelAnimationFrame(this.keepAliveFrameId);
      this.keepAliveFrameId = null;
    }
  };

  private stopFrame = (frames: Frame[], frame: Frame) => {
    const taskIndex = frames.indexOf(frame);
    if (taskIndex !== -1) {
      frames.splice(taskIndex, 1);
    }
    if (frames.length === 0) {
      this.cancelFrame();
      this.lastTimestamp = null;
    }
  };

  public remove = (frame: Frame) => {
    this.stopFrame(this.frames, frame);
    this.stopFrame(this.keepAliveFrames, frame);

    return this;
  };

  public clear = () => {
    this.frames = [];
    this.keepAliveFrames = [];
    this.cancelFrame();
    this.lastTimestamp = null;

    return this;
  };
}

export const frameManager = new FrameManager();
