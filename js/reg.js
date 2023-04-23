const zhangHao = new FieldValidato("txtLoginId", async function (val) {
  if (!val) {
    return "请填写账号";
  }
  const resp = await API.exists(val);
  if (resp.data) {
    return "该账号已存在";
  }
});
const niCheng = new FieldValidato("txtNickname", function (val) {
  if (!val) {
    return "请填写昵称";
  }
});
const miMa = new FieldValidato("txtLoginPwd", async function (val) {
  if (!val) {
    return "请填写密码";
  }
});
const yanZhengMiMa = new FieldValidato("txtLoginPwdConfirm", async function (
  val
) {
  if (!val) {
    return "请填写密码";
  }
  if (val !== miMa.input.value) {
    return "密码错误";
  }
});
const from = $(".user-form");
from.onsubmit = async function (e) {
  // 阻止from表单的默认行为事件
  e.preventDefault();
  const panDuan = await FieldValidato.validat(
    zhangHao,
    niCheng,
    miMa,
    yanZhengMiMa
  );
  if (!panDuan) {
    return;
  }
  console.log(235);
  // 传入一个form表单dom元素，得到一个表达数据对象
  const formData = new FormData(from);
  const data = Object.fromEntries(formData.entries());
  // data是一个对象为form表单里的name的键对值
  const result = await API.reg(data);
  console.log(result);
  if (result.code === 0) {
    alert("注册成功，点击确定跳转到登录页面");
    //这里时切换页面的url地址
    location.href = "./login.html";
  }
};
