export default class Utility {
  static async handleDelete(
    deleteApi: any,
    reloadData: any,
    confirm: any, // Thêm tham số confirm
    toastService: any, // Thêm tham số toastService
    ...params: any
  ) {
    confirm.require({
      message: 'Bạn có chắc chắn muốn xóa thông tin?',
      header: 'Thông báo',
      rejectProps: {
        label: 'Đóng',
        severity: 'secondary',
        outlined: true,
        style: 'min-width:80px'
      },
      acceptProps: {
        label: 'Xác nhận',
        severity: 'primary',
        style: 'min-width:80px'
      },
      accept: async () => {
        try {
          if (params.length > 0) {
            await deleteApi(...params);
          } else {
            await deleteApi(); // Gọi nếu không có tham số
          }

          toastService.add({
            severity: 'success',
            summary: 'Thông báo',
            detail: 'Xóa thành công',
            life: 3000
          });
          // Load lại dữ liệu sau khi xóa
          // await reloadData();
          setTimeout(() => reloadData(), 300);
        } catch (error: any) {
          toastService.add({
            severity: 'error',
            summary: 'Thông báo',
            detail: 'Thất bại: ' + (error.response?.data?.message || error.message),
            life: 3000
          });
        }
      },
      reject: () => {}
    });
  }
}
