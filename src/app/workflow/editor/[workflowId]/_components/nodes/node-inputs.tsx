"use client";
import useFlowValidationContext from "@/components/hooks/use-flow-vaidation";
import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/node/task";
import { Handle, Position, useEdges } from "@xyflow/react";
import React from "react";
import { ColorForHandle } from "./common";
import NodeParamField from "./node-param-field";

type Props = {
  children?: React.ReactNode;
};

function NodeInputs({ children }: Props) {
  return <div className="flex flex-col divide-y-2 gap-2">{children}</div>;
}

export default NodeInputs;

export function NodeInput({
  input,
  nodeId,
}: {
  input: TaskParam;
  nodeId: string;
}) {
  const { invalidInputs } = useFlowValidationContext();
  const edges = useEdges();
  const isConnected = edges.some(
    (edge) =>
      edge?.target === nodeId &&
      edge?.targetHandle === input.name &&
      edge.source
  );
  const hasErrors = invalidInputs
    .find((node) => node.nodeId === nodeId)
    ?.inputs.find((invalidInput) => invalidInput === input.name);

  return (
    <div
      className={cn(
        "flex justify-start relative p-3 bg-secondary w-full",
        hasErrors && "bg-destructive/30"
      )}
    >
      <NodeParamField nodeId={nodeId} param={input} disabled={isConnected} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          isConnectable={!isConnected}
          type="target"
          position={Position.Left}
          className={cn(
            "!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4",
            ColorForHandle[input.type]
          )}
        />
      )}
    </div>
  );
}
