import { getTime } from "../helperfunctions";
import { errorMessage } from "../helperfunctions";

test("get time works as expected", () => {
    expect(getTime(new Date(2021, 12, 18, 18, 25, 12, 0))).toBe("18:25");
    expect(getTime(new Date(2021, 12, 18, 18, 0, 12, 0))).toBe("18:00");
    expect(getTime(new Date(2021, 12, 18, 0, 0, 12, 0))).toBe("00:00");
});

test("error message works as expected", () => {
    expect(errorMessage("auth/wrong-password")).toBe("Incorrect email or password");
    expect(errorMessage("oh no something went wrong")).toBe("oh no something went wrong");
})