import { Context }               from "koa";
import { Controller, Get, Post } from "type-koa";

@Controller('/action')
export class ActionController {
  @Get('/')
  async getRoute(ctx: Context) {
    ctx.body = JSON.stringify({respond: 1});
  }
}
