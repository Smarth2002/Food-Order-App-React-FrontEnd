// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler
const fn = async () => {
    
    setTimeout(() => {
        console.log(2);
    }, 2000);

    console.log(3);
};
const fn1 = () => {
     fn();
    console.log(1);
};

fn1();
