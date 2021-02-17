    let roles: any = {}; //dicionario roles
    let name: any = {}; //dicionario tag
    // const CounterReport = new CounterReport();
    const elementList = page.getElements('*');

  //get explicit roles
  for(const element of elementList){
    const role = AccessibilityUtils.getElementRole(element, page);
    const tag = element.getElementTagName();
    // count elements
    if (role!== null){

    if(roles[role]=== undefined){
      roles[role] = 0;
    }

    roles[role]++;
    }
    // count tags
    
    if(tag!== null){
      if(name[tag]=== undefined){
        name[tag] = 0;
      }
      name[tag]++;
  }

    }

//Get output

    

  }