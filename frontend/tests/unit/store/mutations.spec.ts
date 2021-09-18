import { mutations } from "@/store/index.ts";
import { expect } from "chai";

describe("deleteEntries", () => {
  it("deletes an entry with a given id", () => {
    const state = {
      entries: [
        { id: 1, day: new Date("2021-01-01"), day_type: "homeoffice" },
        { id: 2, day: new Date("2021-01-02"), day_type: "work" },
      ],
    };
    mutations.removeEntry(state, 1);
    expect(state.entries).to.eql([
      { id: 2, day: new Date("2021-01-02"), day_type: "work" },
    ]);
  });
});
