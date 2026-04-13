import { Container, getContainer } from "@cloudflare/containers";

export class FlaskContainer extends Container {
  defaultPort = 8080; // 与Flask应用的端口一致
  sleepAfter = "10m"; // 容器空闲10分钟后休眠
}

export default {
  async fetch(request, env, ctx) {
    // 获取容器实例
    const container = await getContainer(env.CONTAINER_DO, "flask-app");
    
    // 转发请求到容器
    return container.fetch(request);
  },
};