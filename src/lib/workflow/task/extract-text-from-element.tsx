import { TaskParamType, TaskType } from "@/types/node/task";
import { WorkflowTask } from "@/types/workflow/status-type";
import { LucideProps, TextIcon } from "lucide-react";

export const ExtractTextFromElement = {
  Type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
  label: "Get text from Element",
  icon: (props: LucideProps) => (
    <TextIcon className="stroke-primary/80" {...props} />
  ),
  isEntryPoint: false,
  credits: 2,
  inputs: [
    {
      name: "HTML",
      type: TaskParamType.STRING,
      required: true,
      variant: "textarea",
    },
    {
      name: "Selector",
      type: TaskParamType.STRING,
      required: true,
    },
  ] as const,
  outputs: [
    {
      name: "Extracted Text",
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;
