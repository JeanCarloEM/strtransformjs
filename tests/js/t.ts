class myClass {
  private static propA: any[] = ["a", "b"];

  public static myMehod(): Promise<any[]> {
    return new Promise<any[]>((res) => {
      /* call the eventually overridden static method */
      let x: any[] = this.getter();
      /* ... */
      res(x);
    });
  }


  public static getter(): any[] {
    return this.propA;
  }
}

export class childClass extends myClass {
  private static probB: any[] = [1, 2, 3];

  /* overridden static method, which is invoked by the parent */
  public static getter(): any[] {
    return myClass.getter().concat(this.probB);
  }
}

childClass.myMehod().then((r) => console.log(r));
// show: ["a", "b", 1, 2, 3];