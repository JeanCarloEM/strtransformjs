class myClass {
    myMehod() {
        return new Promise((res) => {
            let x = this.constructor.getter();
            res(x);
        });
    }
    static getter() {
        return this.propA;
    }
}
myClass.propA = ["a", "b"];
export class childClass extends myClass {
    static getter() {
        return myClass.getter().concat(this.probB);
    }
}
childClass.probB = [1, 2, 3];
(new childClass()).myMehod().then((r) => console.log(r));
//# sourceMappingURL=76746140.stackoverflow.js.map