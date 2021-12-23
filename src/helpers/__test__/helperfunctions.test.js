import { getTime } from "../helperfunctions";
import { errorMessage } from "../helperfunctions";

test("get time works as expected", () => {
    expect(getTime(1640123530672)).toBe("21:52");
});

test("error message works as expected", () => {
    expect(errorMessage("auth/wrong-password")).toBe("Incorrect email or password");
    expect(errorMessage("oh no something went wrong")).toBe("oh no something went wrong");
});