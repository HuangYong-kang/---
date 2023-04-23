const zhangHao = new FieldValidato("txtLoginId", async function (val) {
  if (!val) {
    return "请填写账号";
  }
});

const miMa = new FieldValidato("txtLoginPwd", async function (val) {
  if (!val) {
    return "请填写密码";
  }
});

const from = $(".user-form");
from.onsubmit = async function (e) {
  // 阻止from表单的默认行为事件
  e.preventDefault();
  const panDuan = await FieldValidato.validat(zhangHao, miMa);
  if (!panDuan) {
    return;
  }
  // 传入一个form表单dom元素，得到一个表达数据对象
  const formData = new FormData(from);
  const data = Object.fromEntries(formData.entries());
  // data是一个对象为form表单里的name的键对值
  const result = await API.login(data);
  console.log(result);
  if (result.code === 0) {
    alert("登录成功，点击确定跳转到登录页面");
    //这里时切换页面的url地址
    location.href = "./index.html";
  } else {
    miMa.p.innerHTML = "密码错误，请检查密码";
  }
};
