#include <iostream>
#include <vector>
#include <queue>
using namespace std;

vector<int> getOrder(vector<int> &in,vector<vector<int>> &v,int n) {

    vector<int> ans;
    queue <int> q;

    for(int i=0;i<n;i++){
        if(in[i]==0)
        q.push(i);
    }

    while(!q.empty()) {

        int i=q.front();
        q.pop();

        ans.push_back(i);

        for(int j=0;j<v[i].size();j++){
            if(v[i][j]==1){
                in[j]--;

                if(in[j]==0)
                q.push(j);
            }
        }
    }
    return ans;
}

int main()
{
    int n;
    cin>>n;

    vector<int> in(n+1,0);

    vector<pair<int,int>> dep(n+1);
    for(int i=0;i<n;i++){
        int a,b;
        cin>>a;
        cin>>b;

        dep.push({a,b});
    }

    vector<vector<int>> v(n+1, vector<int>(n+1,0));
    for(int i=0;i<n;i++){
        v[dep[i].first][dep[i].second]=1;
        in[dep[i].second]++;
    }

    vector<int> order=getOrder(in,v,n);

    for(int i=0;i<order.size();i++)
        cout<<order[i]<<" ";
}
