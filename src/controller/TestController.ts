import {Controller, Get} from "routing-controllers";

@Controller()
export class TestController {
    @Get("/")
    public getAll() {
        return "Hello world!";
    }
    @Get('/foo')
    public hello() {
        return 'bar';
    }
}