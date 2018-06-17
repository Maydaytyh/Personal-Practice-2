// char c[10];
// c[0]='I';c[1]=' ';c[2]='a';c[3]='m';c[4]='h';c[5]='a';c[6]='p';c[7]='p';c[8]='p';c[9]='y';

// char c[10] = {'I',' ','a','m',' ','h','a','p','p','y'};

// char c[] = {'I',' ','a','m',' ','h','a','p','p','y'};

# include <stdio.h>
int main()
{
    // char c[] = {'I',' ','a','m',' ','h','a','p','p','y'};
    char c[] = "I am happy";
    // char c[] = {"I am happy"};
    int i;
    for (i=0;i<10;i++)
        printf("%c",c[i]);
        printf("\n");
    return 0;
}