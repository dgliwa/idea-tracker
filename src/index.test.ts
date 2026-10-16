import { describe, expect, it } from "vitest";
import entry from "./index.js";
import { getToolPluginMetadata } from "openclaw/plugin-sdk/tool-plugin";

describe("idea-tracker", () => {
  it("declares tool metadata", () => {
    expect(getToolPluginMetadata(entry)?.tools.map((tool) => tool.name)).toEqual([
      "idea_add","idea_update","idea_transition","idea_status","idea_note_add","idea_note_update","idea_note_delete","idea_link_add","idea_link_remove","idea_summary",
    ]);
  });
});
