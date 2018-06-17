# include<iostream>
using namespace std;
int main(){
    cout<<"请输入你的姓名与年龄："<<endl;
    char name[16];
    int age;

    cin >> name;
    cin >> age;

    cout << "你的姓名是："<<name<<endl;
    cout << "你的年龄是："<<age<<endl;

    system("PAUSE");
    return 0;
}