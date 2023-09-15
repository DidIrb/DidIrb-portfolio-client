// export const  getAccessToken = ()  => {
//     // Check if the access token is expired
//     const accessToken$ = this.store.select(selectCurrentUser).pipe(
//       map((currentUser) => currentUser?.accessToken),
//       first()
//     );

//     // let token: any = await accessToken$;
//     let token: string = await lastValueFrom(
//       accessToken$.pipe(reduce((acc, val) => acc + val, ''))
//     ).then((value) => {
//       if (value !== undefined) {
//         return value;
//       } else {
//         console.log('There is an error');
//         throw new Error('The observable did not emit any value');
//       }
//     });
    
//     console.log('this is a token', token);
//     return token;
//   }
// }