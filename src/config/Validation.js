export const validateName = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/; // validate tên: chỉ có ký tự chữ
export const validateCompanyName = /[]+/; // validate tên: k có ký tự đặc biệt
export const validateNumOnly = /[A-Za-z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+/; // validate chuỗi: chỉ có ký tự số
export const validateFeeRate = /[A-Za-z!@#$^&*()_+\-=\[\]{};':"\\|,<>\/?\s]+/; // validate tỷ lệ phí: chỉ có ký tự số, ký tự '%' và '.'
export const validateIdentity = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+/; // validate cmnd/cccd/hộ chiếu: k có ký tự đặc biệt
export const validateNumber = /[^A-Za-z0-9]/;
export const validateOnlyNumber = /[^0-9.]/;
export const validLoadCapacity = /^[0-9]{1,2}[.][0-9]{1,2}$/;
export const validNumberCapacity = /^[0-9]{1,3}$/;
