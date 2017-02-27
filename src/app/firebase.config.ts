import {AuthProviders, AuthMethods} from "angularfire2";
/**
 * Created by devilu on 1/31/17.
 */
export const firebaseConfig = {
  apiKey: "AIzaSyBE_C_OviecicNkTLphsphyGKSIXX8Z4p0",
  authDomain: "audgram-fd9f1.firebaseapp.com",
  databaseURL: "https://audgram-fd9f1.firebaseio.com",
  storageBucket: "audgram-fd9f1.appspot.com",
  messagingSenderId: "202293270550"
};
export const authConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}
