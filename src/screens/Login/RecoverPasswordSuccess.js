import React from 'react';
import Success from './components/Success';

function RecoverPasswordSuccess({userName, email}) {
    return (
        <Success content1={'Chúng tôi đã gửi mật khẩu mới qua e-mail. Vui lòng kiểm tra e-mail để cập nhật.'}
                 content2={'Bạn vui lòng truy cập vào email để nhận mật khẩu mới.'}
                 title={'GỬI YÊU CẦU THÀNH CÔNG'}
                 labelButton={'ĐĂNG NHẬP'}
                 userName={userName} 
                 email={email}
        />
    )
}

export default RecoverPasswordSuccess;

