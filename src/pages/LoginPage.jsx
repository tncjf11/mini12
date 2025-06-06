import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, googleLogin } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            setError('');
            setLoading(true);
            
            // Firebase로 로그인
            await login(formData.email, formData.password);
            
            // 성공 시 홈페이지로 이동
            navigate('/');
        } catch (error) {
            setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setError('');
            setLoading(true);
            
            // Google로 로그인
            await googleLogin();
            
            // 성공 시 홈페이지로 이동
            navigate('/');
        } catch (error) {
            setError('Google 로그인에 실패했습니다.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-container">
            <Header />

            <div style={{ padding: '20px 15px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="login-logo"></div>

                <h1 className="login-title">
                    가장 편한 방법으로<br />시작해 보세요!
                </h1>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '292px' }}>
                    {/* 이메일 입력 */}
                    <div className="login-input">
                        <span className="login-input-label">이메일</span>
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                            className="form-control"
                        />
                    </div>

                    {/* 비밀번호 입력 */}
                    <div className="login-input">
                        <span className="login-input-label">비밀번호</span>
                        <input 
                            type="password" 
                            name="password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            required 
                            className="form-control"
                        />
                    </div>

                    {/* 로그인 버튼 */}
                    <button 
                        type="submit" 
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? '처리 중...' : '로그인'}
                    </button>

                    <div className="login-links">
                        <Link to="/forgot-password" className="login-link">
                            비밀번호를 잊어버렸어요!
                        </Link>
                        <Link to="/signup" className="login-link">
                            회원가입
                        </Link>
                    </div>
                </form>

                <div style={{ marginTop: '20px' }}>
                    <p className="social-login-title">1초만에 로그인</p>

                    <div className="social-login-buttons">
                        {/* 구글 */}
                        <div 
                            className="social-login-button google" 
                            onClick={handleGoogleLogin}
                            style={{ cursor: 'pointer' }}
                        >
                            G
                        </div>
                        
                        {/* 다른 소셜 로그인 버튼 */}
                        <div className="social-login-button kakao">K</div>
                        <div className="social-login-button apple">A</div>
                        <div className="social-login-button naver">N</div>
                    </div>
                </div>
            </div>

            {/* 여백 (푸터 공간 확보) */}
            <div style={{ height: '120px' }}></div>

            <Footer />
        </div>
    );
};

export default LoginPage;