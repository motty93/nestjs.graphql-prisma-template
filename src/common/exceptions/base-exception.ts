import { constantCase } from 'change-case'

export class BaseException extends Error {
  // エラーコードを直接指定したい場合はセットする
  // デフォルトはクラス名を大文字にしたものが使われる
  errorCode: string

  setErrorCode(errorCode: string) {
    this.errorCode = errorCode
  }

  getErrorCode(): string {
    if (this.errorCode) {
      return this.errorCode
    }
    // クラス名をエラーコードとして使用する
    // SomethingWrong > SOMETHING_WRONG
    return constantCase(this.constructor.name)
  }
}
