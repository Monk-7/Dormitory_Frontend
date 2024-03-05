import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Dialog,
  DialogBody,
  Typography,
} from "@material-tailwind/react";
import React from "react";

export default function DeletePopup(props: any) {
  return (
    <Dialog open={props.open} handler={props.handler} size="xs">
      <DialogBody className="flex flex-col items-center gap-6 text-center py-8">
        <ExclamationTriangleIcon width={40} color="red" />
        <Typography variant="h4" color="black">
          Are you sure?
        </Typography>
        <Typography className="text-center font-normal">
          Do you really want to delete this {props.name}. Details within this{" "}
          {props.name} cannot be recovered later.
        </Typography>
        <div className="flex justify-end gap-5">
          <Button variant="outlined" onClick={props.handler}>
            close
          </Button>
          <Button
            variant="gradient"
            color="red"
            onClick={() => {
              props.handler();
              props.del();
            }}
          >
            Delete
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  );
}
