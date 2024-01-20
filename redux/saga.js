import axios from "axios";
import { call, put, takeLatest } from "@redux-saga/core/effects";
import * as action from "./reducer";
import Cookies from "js-cookie";
axios.defaults.baseURL = 'https://backend.az808080.com/';

function* CreateBanner({ payload }) {
  try {
    // console.log('aslkdmaslkdmasd',payload.username.replace('+','00'))
    const token = localStorage.getItem("Access");
    const respo = yield call(axios.post, "banner/create", payload, {
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "multipart/form-data"
      },
    });
    console.log('sapdfkmados', respo)
    const { message } = respo.data;
    alert(message)
    yield put(action.Message({ message: message, open: true }));
  } catch (error) {
    const { message } = error.response.data;
    yield put(action.Message({ message: message, open: true }));
  }
}

function* Main_Category({ payload }) {
  try {
    const resp = yield call(axios.get, "category/main-sub-list");

    yield put(action.Main_Category(resp.data));
  } catch (error) { }
}

function* SalesMan_BannerType({ payload }) {
  try {
    const resp = yield call(axios.get, "/banner/banner-types-and-salesman");
    const { data } = resp.data;

    yield put(action.SalesMan_BannerType(data));
  } catch (error) { }
}

function* Child_Category({ payload }) {
  try {
    const resp = yield call(
      axios.get,
      `/category/child-list-commercial/${payload}`
    );
    const { data } = resp.data;
    yield put(action.Child_Category(data));
  } catch (error) { }
}

function* Customers({ payload }) {
  const { rowsPerPage, page } = payload;
  try {
    const resp = yield call(
      axios.get,
      `/user/all?take=${rowsPerPage}&page=${page}`
    );
    const { data } = resp.data;
    const { pagination } = resp.data;
    yield put(action.Customers(data));
    yield put(action.Customers_Pagination(pagination));
  } catch (error) { }
}

function* User({ payload }) {
  try {
    const resp = yield call(axios.get, `/user/${payload}`);
    const data = resp.data;
    yield put(action.User(data));
  } catch (error) { }
}

function* Country() {
  try {
    const resp = yield call(axios.get, "/address/countries-list");
    const { data } = resp.data;
    yield put(action.Countries(data));
  } catch (error) { }
}

function* Ad_List({ payload }) {
  const { id, take, page } = payload;
  try {
    const respo = yield call(
      axios.get,
      `ad/list/109/${id}?take=${take}&page=${page}`
    );
    const { data } = respo.data;
    yield put(action.Ads_List(respo.data));
    yield put(action.Ads_Pagination(respo.data));
  } catch (error) { }
}
function* Ad_Detail({ payload }) {
  try {
    const respo = yield call(axios.get, `ad/detail/${payload}`);
    const { data } = respo.data;
    const { customer_id } = data;
    yield put(action.Ad_Detail(data));
    yield put({ type: "ADD_USER", payload: customer_id });
  } catch (error) { }
}
function* Ad_User({ payload }) {
  try {
    const respo = yield call(axios.get, `user/${payload}`);
    // const { data } = respo.data;
    yield put(action.Ad_User(respo.data));
  } catch (error) { }
}

function* Add_Category({ payload }) {
  try {
    const respo = yield call(axios.post, "category/add", {
      payload,
    });
    const data = respo.data;
  } catch (error) { }
}
function* Login({ payload }) {
  try {
    if (payload.username)
      payload.username = payload.username.replace('+', '00')
    // console.log('aslkdmaslkdmasd',payload.username.replace('+','00'))
    const respo = yield call(axios.post, "user/admin-login", payload);
    const { access_token, user, message } = respo.data;
    console.log('aslkdmaslkdmasd', respo.data)
    const links = document.createElement("a");
    if (access_token) {
      links.setAttribute("href", "/");
      localStorage.setItem("Access", access_token);
      localStorage.setItem("Token_id", user.id);
      Cookies.set("auth_token", access_token);
      links.click();
    } else {
    }
  } catch (error) {
    const { message } = error.response.data;
    yield put(action.Message({ message: message, open: true }));
  }
}
function* Register({ payload }) {
  try {

    const token = localStorage.getItem("Access");
    const respo = yield call(axios.post, "user/register-by-admin", payload, {
      headers: {
        Authorization: `bearer ${token}`,
        //  "Content-Type": "multipart/form-data"
      },
    });
    const { message, data } = respo.data;

    if (message == "User Already Exist")
      yield put(action.Customer_data_by_admin({}));
    alert(message)
    yield put(action.Message({ message: message, open: true }));
  } catch (error) { }
}

function* EnterInRegister({ payload }) {

  yield put(action.Customer_data_by_admin({}));

}

function* AddUserSocialLogins({ payload }) {
  try {
    console.log('a;skdmalsdasdasdadasdasd', payload)
    const token = localStorage.getItem("Access");
    const respo = yield call(axios.post, "profile/add-social-link/" + payload.customer_id, payload, {
      headers: {
        Authorization: `bearer ${token}`,
        // "Content-Type": "multipart/form-data"
      },
    });
    const { message } = respo.data;
    alert(message)
    yield put(action.Message({ message: message, open: true }));
  } catch (error) { }
}

function* Notification({ payload }) {
  try {
    const respo = yield call(
      axios.post,
      `/notifications/admin`,
      { content_id: payload.countryId, ...payload.data }
    );
    const { message } = respo.data;
    if (message == "admin Notification created successfully") {
      yield put(action.Verify(true));
    } else {
      yield put(action.Message({ message: message, open: true }));
    }
  } catch (error) { }
}
function* Verify({ payload }) {
  try {
    const respo = yield call(axios.post, "user/verify", payload);
    const { message } = respo.data;
    if (message == "Verification successful") {
      const links = document.createElement("a");
      links.setAttribute("href", "/authentication/sign-in/");
      links.click();
    } else {
      yield put(action.Message({ message: message, open: true }));
    }
  } catch (error) { }
}
function* Forget_Verify({ payload }) {
  try {
    const respo = yield call(axios.post, "user/forget-password", payload);
    const { message } = respo.data;
    if (message == "Password Changed Successfully") {
      const links = document.createElement("a");
      links.setAttribute("href", "/authentication/sign-in/");
      links.click();
    } else {
      yield put(action.Message({ message: message, open: true }));
    }
  } catch (error) { }
}
function* Forget_Password({ payload }) {
  try {
    const respo = yield call(axios.post, "user/otp-forget-password", payload);
    const { message } = respo.data;
    if (message == "OTP Send Successfully") {
      yield put(action.Verify(true));
    } else {
      yield put(action.Message({ message: message, open: true }));
    }
  } catch (error) { }
}
function* Banner_Home({ payload }) {
  const { country_id, page } = payload;
  try {
    const respo = yield call(
      axios.get,
      `banner/banner-home-list/${country_id}?take=40&page=${page}`
    );
    const { data, pagination } = respo.data;
    yield put(action.Banner_Home(data));
    yield put(action.Pagination(pagination));
  } catch (error) { }
}
function* Banner_Recommend({ payload }) {
  const { country_id, page } = payload;
  try {
    const respo = yield call(
      axios.get,
      `banner/recommand-home-list/${country_id}?take=40&page=${page}`
    );
    const { data, pagination } = respo.data;
    yield put(action.Banner_Recommend(data));
    yield put(action.Pagination(pagination));
  } catch (error) { }
}
function* Banner_Splash({ payload }) {
  const { country_id, page } = payload;
  try {
    const respo = yield call(
      axios.get,
      `banner/splash-home-list/${country_id}?take=40&page=${page}`
    );
    const { data, pagination } = respo.data;
    yield put(action.Banner_Splash(data));
    yield put(action.Pagination(pagination));
  } catch (error) { }
}
function* Banner_Category({ payload }) {
  const { country_id, page, id } = payload;
  try {
    const respo = yield call(
      axios.get,
      `banner/banner-category-list/${country_id}/${id}?take=40&page=${page}`
    );
    const { data, pagination } = respo.data;
    yield put(action.Banner_Category(data));
    yield put(action.Pagination(pagination));
  } catch (error) { }
}
export default function* HomeSaga() {
  yield takeLatest("MAIN_CATEGORY", Main_Category);
  yield takeLatest("CREATEBANNER", CreateBanner);
  yield takeLatest("SALESMAN_BANNERTYPE", SalesMan_BannerType);
  yield takeLatest("CHILD_CATEGORY", Child_Category);
  yield takeLatest("CUSTOMERS", Customers);
  yield takeLatest("COUNTRY", Country);
  yield takeLatest("ADD_LIST", Ad_List);
  yield takeLatest("ADD_DETAIL", Ad_Detail);
  yield takeLatest("ADD_USER", Ad_User);
  yield takeLatest("ADD_Category", Add_Category);
  yield takeLatest("USER", User);
  yield takeLatest("LOGIN", Login);
  yield takeLatest("REGISTER", Register);
  yield takeLatest("ENTERINREGISTE", EnterInRegister);
  yield takeLatest("ADD_USER_SOCILA_LOGINS", AddUserSocialLogins)
  yield takeLatest("VERIFY", Verify);
  yield takeLatest("BANNER_HOME", Banner_Home);
  yield takeLatest("BANNER_RECOMMEND", Banner_Recommend);
  yield takeLatest("BANNER_SPLASH", Banner_Splash);
  yield takeLatest("BANNER_CATEGORY", Banner_Category);
  yield takeLatest("FORGET_VERIFY", Forget_Verify);
  yield takeLatest("FORGET_PASSWORD", Forget_Password);
  yield takeLatest("NOTIFICATIONS", Notification);
}
