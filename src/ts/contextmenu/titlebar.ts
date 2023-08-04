import { maximizeWindow, minimizeWindow, openWindow } from "../applogic/events";
import type { ContextMenuItem } from "../applogic/interface";
import { SEP_ITEM } from "./main";
import appManIcon from "../../assets/apps/appmanager.svg";

export const titleBarContextMenu: ContextMenuItem[] = [
  {
    caption: "Maximize",
    async isActive(window) {
      return window.state.windowState.max && window.controls.max;
    },
    action(window) {
      window.controls.max && maximizeWindow(window);
    },

    icon: "crop_square",
  },
  {
    caption: "Minimize",
    async isActive(window) {
      return window.state.windowState.min && window.controls.min;
    },
    action(window) {
      window.controls.min && minimizeWindow(window);
    },
    icon: "minimize",
  },
  SEP_ITEM,
  {
    caption: "Application Manager",
    action() {
      openWindow("AppMan");
    },
    image: appManIcon,
  },
];