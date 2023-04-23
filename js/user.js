class FieldValidato {
  constructor(inputId, verification) {
    this.input = $("#" + inputId);
    this.p = this.input.nextElementSibling;
    this.verification = verification;
    this.input.onblur = () => {
      this.validate();
    };
  }
  async validate() {
    const err = await this.verification(this.input.value);
    if (err) {
      this.p.innerHTML = err;
      return false;
    } else {
      this.p.innerHTML = "";
      return true;
    }
  }
  // 将传入的验证器同时进行验证并返回结果
  static async validat(...args) {
    const our = args.map((ele) => ele.validate());
    const start = await Promise.all(our);
    return start.every((e) => e);
  }
}
