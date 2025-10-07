import { StatusCodeEnum } from "@/components/config/enum";
import i18n from "@/i18n/index.js";
const { t } = i18n.global;

export const showSuccessMessage = (message: string, toast: any) => {
  toast.add({
    severity: "success",
    summary: t('api-message.title'),
    detail: t(`api-message.${message}`),
    life: 3000,
  });
};

export const showErrorMessage = (status: any, toast: any) => {
  const keyMsg =
    status === StatusCodeEnum.FORBIDDEN ? "not-permission" : "message";
  toast.add({
    severity: "error",
    summary: t("error-msg.error.title"),
    detail: t(`error-msg.error.${keyMsg}`),
    life: 3000,
  });
};

export const showBadRequestErrorMessage = (response: any, toast: any, deletedName?: any) => {
  toast.add({
    severity: "error",
    summary: t("error-msg.error.title"),
    detail: t(`error-msg.error.${response.data?.code}`, { param: deletedName ?? response.data?.message }),
    life: 3000,
  });
};

export const handleShowValidationError = (keyMsg: any, toast: any, paramObject?: any) => {
  toast.add({
    severity: "error",
    summary: t('error-msg.error.title'),
    detail: t(`error-msg.${keyMsg}`, paramObject),
    life: 3000,
  });
}