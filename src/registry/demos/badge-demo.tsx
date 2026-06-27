import { Check } from "lucide-react";

import { Badge } from "@/registry/ui/badge";

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Badge variant="solid">Solid</Badge>
      <Badge variant="soft">Soft</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="accent">
        <Check /> Shipped
      </Badge>
    </div>
  );
}
