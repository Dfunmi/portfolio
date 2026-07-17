"use client";

import { useState } from "react";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Typography";

/** Demo-only: shows Tag's onRemove behavior, which needs a client-side handler. */
export function RemovableTagDemo() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <Text variant="small" muted className="italic">
        removed — reload to reset
      </Text>
    );
  }

  return <Tag onRemove={() => setVisible(false)}>Removable</Tag>;
}
