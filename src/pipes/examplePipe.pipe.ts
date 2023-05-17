import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class examplePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('Using pipe');
    console.log('Pipe value:', value);
    console.log('Pipe metadata:', metadata);
    return value;
  }
}
