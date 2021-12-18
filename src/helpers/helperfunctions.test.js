import { getTime } from "./helperfunctions";

test("get time works as expected", () => {
    expect(getTime(new Date(2021, 12, 18, 18, 25, 12, 0))).toBe("18:25");
    expect(getTime(new Date(2021, 12, 18, 18, 0, 12, 0))).toBe("18:00");
    expect(getTime(new Date(2021, 12, 18, 0, 0, 12, 0))).toBe("00:00");
});