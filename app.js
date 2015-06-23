/**
 * Created by Hernan Y.Ke on 2015/6/15.
 */
var app = Ember.Application.create();
app.Store = DS.Store.extend({
    adapter:DS.RESTAdapter
});
app.ApplicationAdapter = DS.RESTAdapter.extend({
    namespace:'api'
});

app.Contact = DS.Model.extend({
    firstName:DS.attr('string'),
    lastName:DS.attr('string'),
    email:DS.attr('string')
});

app.ContactSerializer = DS.RESTSerializer.extend({
    extractArray:function(store,primaryType,payload){
        payload={contacts:payload};
        return this._super(store,primaryType,payload);
    },

    extractSingle: function(store,primaryType,payload,recordId){
        payload ={contact:payload};
        this._super(store,primaryType,payload,recordId);
    },
    serializeIntoHash:function(hash,type,snapshot,options){
        var json =this.serialize(snapshot,{includeId:true});
        Object.keys(json).forEach(function(key){
            hash[key]=json[key];
        });
    }
});



app.Router.reopen({
    location:'history'
});

app.Router.map(function(){
    this.resource('contacts');
    this.resource('contact',{path:'contacts/:contact_id'});
    this.route('new',{path:'contact/new'});
});

app.IndexRoute =Ember.Route.extend({
    redirect:function(){
        this.transitionTo('contacts');
    }
});
app.ContactsRoute = Ember.Route.extend({
    model:function(){
        return this.store.find('contact');
    }
});
