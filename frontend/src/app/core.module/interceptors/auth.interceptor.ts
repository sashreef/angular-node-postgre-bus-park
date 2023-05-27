import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, switchMap } from 'rxjs';

@Injectable()
export class authInterceptor { }
// export class authInterceptor implements HttpInterceptor {
//     constructor(private axiousService: Axios) { }


//     // export const login = createAsyncThunk(
// //     "auth/login",
// //     async (
// //       userData: { login: string; password: string },
// //       { rejectWithValue }
// //     ) => {
// //       try {
// //         const response = await axios.post(
// //           "/user/sign_in",
// //           { login: userData.login, password: userData.password },
// //           { withCredentials: true }
// //         );
// //         response.data.login = userData.login;
// //         return response.data;
// //       } catch (err) {
// //         const error = err as AxiosError;
// //         return rejectWithValue(error.response?.status);
// //       }
// //     }
// //   );


// }
