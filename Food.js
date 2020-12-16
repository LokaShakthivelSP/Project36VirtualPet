class Food {
    constructor(){
        this.image = loadImage("Milk.png");
        this.foodStock;
        this.lastFed;
        this.currentTime;
    }
    
    getFoodStock(){
        database.ref("Food").on("value",(data)=>{
            this.foodStock = data.val();
        });
    }

    updateFoodStock(){
        database.ref("/").update({
            Food:this.foodStock
        });
    }

    deductFood(){
        if(this.foodStock > 0){
            this.foodStock = this.foodStock - 1;
            database.ref("/").update({
                Food:this.foodStock,
                FeedTime: hour()
            });

            database.ref("FeedTime").on("value",(data)=>{
                this.lastFed = data.val();
            });
            console.log(this.lastFed);

            database.ref("/").update({
                CurrentTime: hour()
            });

            database.ref("CurrentTime").on("value",(data)=>{
                this.currentTime = data.val();
            });
        }
    }


    display(){
        var x = 80;
        var y = 150;
        
        database.ref("/").update({
            CurrentTime: hour()
        });
        
        database.ref("CurrentTime").on("value",(data)=>{
            this.currentTime = data.val();
        });
       
        imageMode(CENTER);

        if(this.foodStock != 0){
            for(var i =0; i < this.foodStock; i++){
                if(i % 10 == 0){
                    x=80;
                    y = y + 70;
                }
                image(this.image,x,y,50,50);
                x = x + 30;
            }
        }
    }
}