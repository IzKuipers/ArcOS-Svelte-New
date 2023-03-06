import { createOverlayableError } from "../../../errorlogic/overlay";
import { showOverlay } from "../../../window/overlay";
import type { App, AppContextMenu } from "../../interface";
import {
  fbClass,
  FileBrowserCopyingFilename,
  FileBrowserCuttingFilename,
  FileBrowserSelectedFilename,
} from "./main";
import trash from "../../../../assets/apps/logger/clear.svg";

export const FileManagerContextMenu: AppContextMenu = {
  "listitem-dir": [
    {
      icon: "launch",
      caption: "Open",
      action: (_: App, data: DOMStringMap) => {
        const path = data.path;

        if (!path) return;

        fbClass.goToDirectory(path);
      },
    },
    {
      icon: "drive_file_rename_outline",
      caption: "Rename",
      action: (_: App, data: DOMStringMap) => {
        FileBrowserSelectedFilename.set(data.name);

        showOverlay("renameItem", "FileManager");
      },
    },
    {
      icon: "content_copy",
      caption: "Copy",
      action: (_: App, data: DOMStringMap) => {
        FileBrowserSelectedFilename.set(data.name);

        FileBrowserCopyingFilename.set({
          name: data.name,
          scopedPath: `${data.path}`,
        });
      },
    },
    {
      icon: "content_cut",
      caption: "Cut",
      action: (_: App, data: DOMStringMap) => {
        FileBrowserSelectedFilename.set(data.name);

        FileBrowserCuttingFilename.set({
          name: data.name,
          scopedPath: `${data.path}`,
        });
      },
    },
  ],
  "listitem-file": [
    {
      caption: "Delete",
      action: (_: App, data: DOMStringMap) => {
        createOverlayableError(
          {
            title: "Delete item?",
            message: `Are you sure you want to permanently delete ${data.name}?`,
            buttons: [
              {
                caption: "Delete",
                action: async () => {
                  fbClass.deleteItem(data["name"], data["path"]);
                },
              },
              { caption: "Cancel", action() {} },
            ],
            image: trash,
          },
          "FileManager"
        );
      },
    },
  ],
};