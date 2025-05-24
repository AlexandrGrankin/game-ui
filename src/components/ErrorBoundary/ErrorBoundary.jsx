import React from 'react';
import PropTypes from 'prop-types';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error) {
        // Обновляем состояние так, чтобы следующий рендер показал запасной UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Логируем ошибку для отладки
        console.error('Error caught by ErrorBoundary:', error, errorInfo);

        this.setState({
            error: error,
            errorInfo: errorInfo
        });

        // Здесь можно отправить ошибку в сервис логирования
        // logErrorToService(error, errorInfo);
    }

    handleReload = () => {
        window.location.reload();
    };

    handleGoHome = () => {
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <div className="error-boundary-content">
                        <div className="error-boundary-icon">⚠️</div>
                        <h2 className="error-boundary-title">Что-то пошло не так!</h2>
                        <p className="error-boundary-message">
                            Произошла непредвиденная ошибка в приложении.
                            Попробуйте обновить страницу или вернуться на главную.
                        </p>

                        <div className="error-boundary-actions">
                            <button
                                className="error-boundary-button primary"
                                onClick={this.handleReload}
                            >
                                Обновить страницу
                            </button>
                            <button
                                className="error-boundary-button secondary"
                                onClick={this.handleGoHome}
                            >
                                На главную
                            </button>
                        </div>

                        {/* Показываем детали ошибки только в режиме разработки */}
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="error-boundary-details">
                                <summary>Детали ошибки (только для разработки)</summary>
                                <pre className="error-boundary-stack">
                                    {this.state.error && this.state.error.toString()}
                                    <br />
                                    {this.state.errorInfo?.componentStack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired
};

export default ErrorBoundary;