import { HttpInterceptorFn } from '@angular/common/http';

export const csrfInterceptor: HttpInterceptorFn = (req, next) => {
  const token = getCookie('XSRF-TOKEN');

  if (token) {
    const modifiedReq = req.clone({
      headers: req.headers.set('X-XSRF-TOKEN', token),
      withCredentials: true,
    });
    return next(modifiedReq);
  }

  return next(req);
};

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}
