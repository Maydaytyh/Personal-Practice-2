# include<iostream>
using namespace std;

int main(){
    int a = 10;
    int &b = a;
    char c = 'c';
    b = b + 2;
    cout<<&a<<endl;
    cout<<&b<<endl;
    cout<<a<<endl;
    cout<<b<<endl;
    cout<<c<<endl;
    cout<<&c<<endl;
    

    system("PAUSE");
    return 0;
}