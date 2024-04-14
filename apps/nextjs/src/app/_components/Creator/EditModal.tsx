import React from "react";

import { Button } from "@acme/ui/button";

import type { TStreamType } from "./Creator";

interface EditModalProps {
  streamData: TStreamType;
  onClose: () => void;
  onSave: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  streamData,
  onChange,
  onClose,
  onSave,
}) => {
  return (
    <form
      className="w-ful fixed inset-0 z-50 flex h-full items-center justify-center bg-black/80"
      onSubmit={onSave}
    >
      <div className="w-[40rem] rounded-md  bg-[#282828] p-2">
        <div className="border-b border-[#3d3d3d] pb-4 text-xl font-medium text-white">
          Edit Settings
        </div>

        <div className="mt-4 border border-[#3d3d3d] p-2">
          <div className="fomt-white text-sm font-medium">Title (required)</div>

          <input
            name="title"
            value={streamData.title}
            placeholder="Enter Your Livestream Title (Required)"
            onChange={(e) => onChange(e)}
            type="text"
            className="mt-1.5 w-full border-b border-white bg-transparent p-1.5 text-sm font-normal text-white placeholder:text-sm focus:outline-none"
          />
        </div>

        <div className="mt-4 border border-[#3d3d3d] p-2">
          <div className="fomt-white text-sm font-medium">Desctiption</div>

          <textarea
            className="mt-1.5 w-full resize-none bg-transparent text-sm font-normal text-white placeholder:text-sm focus:outline-none"
            cols={10}
            rows={8}
            name="desc"
            value={streamData.desc}
            onChange={onChange}
            placeholder="please enter a meaningful description......"
          />
        </div>

        <div className="mt-4 flex items-center justify-end gap-4 border-t border-[#3d3d3d] p-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={!streamData.desc}>
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};
export default React.memo(EditModal);
