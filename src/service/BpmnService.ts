import axiosInstance from "@/plugins/axiosBase";


export default class BpmnService {
  async getBpmn() {
    const res = await axiosInstance.get(`/engine-rest/engine/default/deployment`)
    return res.data
  }

  async getBpmnById(id: number) {
    const res = await axiosInstance.get(`/engine-rest/engine/default/deployment/${id}`)
    return res.data
  }

  async deleteBpmn(id: number) {
    const res = await axiosInstance.delete(`/engine-rest/engine/default/deployment/${id}`)
    return res.data
  }
}