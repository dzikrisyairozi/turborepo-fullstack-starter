import { Controller, Get } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiProduces,
} from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Get welcome message',
    description:
      'Returns a simple welcome message to verify the API is running',
  })
  @ApiResponse({
    status: 200,
    description: 'Welcome message returned successfully',
    schema: {
      type: 'string',
      example: 'Hello World!',
    },
  })
  @ApiProduces('text/plain')
  getHello(): string {
    return this.appService.getHello();
  }
}
