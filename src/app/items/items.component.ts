import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../item';

import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  private items: Item[];
  addItemForm;

  constructor(
    private itemService: ItemService,
    private formBuilder: FormBuilder,
  ) { 
    this.addItemForm = this.formBuilder.group({
      itemName: ''
    });
  }

  ngOnInit() {
    this.getItems();
  }

  onSubmit(formObject): void{

    // TODO: _refactor_ type workaround 
    const itemName = formObject.itemName;

    const newItem: Item = {
      item_name : itemName
    };

    this.addItem(newItem);
    this.addItemForm.reset();
 
  }

  private getItems(): void{
    this.itemService.getItems().subscribe((data: Item[]) => this.items = data);
  }

  deleteItem(item: Item): void{
    this.items = this.items.filter(i => i !== item);
    const itemId = item._id;
    this.itemService.deleteItem(itemId).subscribe();
  }

  deleteAllItems(): void{
    this.items = [];
    this.itemService.deleteAllItems().subscribe();
  }


  private addItem(item: Item){
    this.itemService.addItem(item).subscribe(i => this.items.push(i));
  }

}
