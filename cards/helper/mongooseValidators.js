const DEFAULT_VALIDATION = {
  type: String,
  minlength: 2,
  maxlength: 256,
  required: true,
  trim: true,
};
const EMAIL = {
  type: String,
  math: RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"),
};
const URl = {
  type: String,
  math: RegExp(
    "^(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})$"
  ),
};
const ISRAELI_PHONE = {
  type: String,
  math: RegExp(/\+?(972|0)(-)?(d{2}(-)?d{7}|d{2}(-)?d{3}(-)?d{4})/),
};

exports.DEFAULT_VALIDATION = DEFAULT_VALIDATION;
exports.EMAIL = EMAIL;
exports.URl = URl;
exports.ISRAELI_PHONE = ISRAELI_PHONE;
